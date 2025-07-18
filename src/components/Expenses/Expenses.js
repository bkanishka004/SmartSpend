import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  ListGroup,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import SidebarNav from "../SidebarNav/SidebarNav";
import BreadcrumbAndProfile from "../BreadcrumbAndProfile/BreadcrumbAndProfile";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faPlusCircle,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale
);

function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Utility", "Rent", "Groceries", "Entertainment", "Other"];

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(expenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "Expenses.xlsx");
  };

  const handleEdit = (expense) => {
    setEditing(true);
    setCurrentExpense(expense);
    setName(expense.name);
    setAmount(expense.amount);
    setDate(expense.date);
    setDescription(expense.description);
    setIsPaid(expense.status === "PAID");
    setCategory(expense.category || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !date || !description || !category) {
      alert("All fields are required.");
      return;
    }

    const confirmMessage = editing
      ? "Are you sure you want to update this expense?"
      : "Are you sure you want to add this expense?";

    if (!window.confirm(confirmMessage)) return;

    const expenseData = {
      id: editing ? currentExpense.id : Date.now(),
      name,
      amount,
      date,
      description,
      status: isPaid ? "PAID" : "DUE",
      category,
    };

    if (editing) {
      setExpenses(
        expenses.map((exp) =>
          exp.id === currentExpense.id ? expenseData : exp
        )
      );
    } else {
      setExpenses([...expenses, expenseData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setDate("");
    setDescription("");
    setIsPaid(false);
    setEditing(false);
    setCurrentExpense(null);
    setCategory("");
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this expense?")) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  const filteredExpenses = searchQuery
    ? expenses.filter(
        (exp) =>
          exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exp.category?.toLowerCase() || "").includes(
            searchQuery.toLowerCase()
          )
      )
    : expenses;

  const chartData = {
    labels: expenses.map((exp) => new Date(exp.date)),
    datasets: [
      {
        label: "Total Expenses",
        data: expenses.map((exp) => exp.amount),
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <SidebarNav />
        </Col>
        <Col md={10} className="main">
          <BreadcrumbAndProfile
            username="Kanishka Bhardwaj"
            role="3rd year Developer"
            pageTitle="Expenses"
            breadcrumbItems={[
              { name: "Dashboard", path: "/dashboard", active: false },
              { name: "Expenses", path: "/expenses", active: true },
            ]}
          />

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search expenses..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Row>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="mt-3 total">
                  <Card.Body>
                    <Card.Title>Total Expense</Card.Title>
                    <Card.Text>Total: ₹{totalExpense.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={6}>
              <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
              </div>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Row className="grid-row">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Expense Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Expense Amount"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="grid-row">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Paid"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="mt-3 primary-button">
              {editing ? "Update Expense" : "Add Expense"}
              <FontAwesomeIcon icon={faPlusCircle} className="icon-right" />
            </Button>
          </Form>

          <ListGroup className="mt-3">
            {filteredExpenses.map((expense) => (
              <ListGroup.Item key={expense.id} className="list-group-item">
                <div className="expense-details">
                  {`${expense.name} - Amount: ₹${expense.amount} - Date: ${
                    expense.date
                  } - Type: ${expense.description} - Category: ${
                    expense.category || "Not specified"
                  } - Status: ${expense.status}`}
                </div>
                <div className="button-group">
                  <Button
                    className="edit"
                    size="sm"
                    onClick={() => handleEdit(expense)}
                    style={{ marginRight: "5px" }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="icon-left"
                    />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(expense.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="icon-left" />
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button onClick={exportToExcel} className="mt-3 excel-button">
            <FontAwesomeIcon icon={faFileExcel} className="icon-left" /> Export
            to Excel
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Expenses;
