import { useState } from "react";

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const strongPasswordPattern = /(?=.*[A-Z])(?=.*\d).{8,}/;

const validate = (values) => {
  const issues = {};

  if (!values.fullName.trim()) {
    issues.fullName = "Full name is required.";
  }

  if (!values.email) {
    issues.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    issues.email = "Enter a valid email address.";
  }

  if (!values.password) {
    issues.password = "Password is required.";
  } else if (values.password.length < 8) {
    issues.password = "Password must be at least 8 characters.";
  } else if (!strongPasswordPattern.test(values.password)) {
    issues.password = "Include at least one uppercase letter and number.";
  }

  if (!values.confirmPassword) {
    issues.confirmPassword = "Please confirm your password.";
  } else if (values.password && values.confirmPassword !== values.password) {
    issues.confirmPassword = "Passwords do not match.";
  }

  if (!values.terms) {
    issues.terms = "You must agree to the terms of service.";
  }

  return issues;
};

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  marketing: false,
  terms: false
};

function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    const nextForm = { ...form, [name]: nextValue };
    setForm(nextForm);
    setErrors(validate(nextForm));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const texhologs = 'success'

  const handleSubmit = (event) => {
    event.preventDefault();
    const handleBlur is=true