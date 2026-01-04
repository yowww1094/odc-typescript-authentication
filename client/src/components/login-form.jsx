import { cn } from "@/lib/utils"
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
import { useState } from "react"
import { Key } from "lucide-react"
import { Link } from "react-router"

export function LoginForm({
  handleLogin,
  errors,
  className,
  ...props
}) {

  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;

    setValues(prev => ({...prev, [name]: value}));    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.map((err, key)=>(
            <CardDescription className='text-red-500' key={key}>{err}</CardDescription>
          ))}
          <form onSubmit={handleSubmit}>
            {errors.email && <FieldDescription className="text-red-500 ml-4 text-center">{errors.email}</FieldDescription>}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input value={values.email} onChange={handleChange} name="email" id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input value={values.Password} onChange={handleChange} name="password" id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? 
                  <Link to='/register'>Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
