import { useState } from "react";
import * as Yup from "yup";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    age: "",
    gender: "",
    interests: [],
    birthdate: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email Format"),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must be match")
      .required("Confirm Password is required"),
    age: Yup.number()
      .typeError("Age must be a Number")
      .min(18, "You must be at least 18 Years old")
      .max(80, "You8 cannot be older than 80 Years")
      .required("Age is Required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at lease one interest is Required"),
    birthdate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form is Submitted Succesfully", formData);
    } catch (error) {
      console.log(error);

      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;

    let updatedInterests = [...formData.interests];

    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter((interest) => {
        interest != name;
      });
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label> First Name : </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Your First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div>
          <label> Last Name : </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Your Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label> Email : </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label> Phone Number : </label>
          <input
            type="text"
            name="phonenumber"
            placeholder="Enter Your Phone Number"
            value={formData.phonenumber}
            onChange={handleChange}
          />{" "}
          {errors.phonenumber && (
            <div className="error">{errors.phonenumber}</div>
          )}
        </div>
        <div>
          <label> Password : </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label> Confirm Password : </label>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Your Password"
            value={formData.confirmpassword}
            onChange={handleChange}
          />
          {errors.confirmpassword && (
            <div className="error">{errors.confirmpassword}</div>
          )}
        </div>
        <div>
          <label> Age : </label>
          <input
            type="number"
            name="age"
            placeholder="Enter Your Age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        <div>
          <label> Gender : </label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value=""> Select Gender</option>
            <option value="male"> Male</option>
            <option value="female"> Female</option>
            <option value="other"> Other</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>

        <div>
          <label> Interests : </label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interests.includes("coding")}
              onChange={handleChecked}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.interests.includes("sports")}
              onChange={handleChecked}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interests.includes("reading")}
              onChange={handleChecked}
            />
            Reading
          </label>
          {errors.interests && <div className="error">{errors.interests}</div>}
        </div>
        <div>
          <label> Date of Birth :</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            placeholder="Enter Your date of birth"
            onChange={handleChange}
          />
          {errors.birthdate && <div className="error">{errors.birthdate}</div>}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Form;
