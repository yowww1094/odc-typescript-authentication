import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Link } from "react-router";

export function SignupForm({
  errors,
  handleRegister,
  ...props
}) {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values);
  }


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {errors.map((err, key)=>(
          <CardDescription className='text-red-500' key={key}>{err}</CardDescription>
        ))}
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input onChange={handleChange} value={values.name} name="name" type="text" placeholder="John Doe" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input onChange={handleChange} value={values.email} name="email" type="email" placeholder="m@example.com" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input onChange={handleChange} value={values.password} name="password" type="password" required />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input onChange={handleChange} value={values.passowrdConfirmation} name="passowrdConfirmation" type="password" required />
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? 
                  <Link to={'/login'}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
