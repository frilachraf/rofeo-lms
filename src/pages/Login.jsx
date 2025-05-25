import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Error from '../components/theme/Error';
import { getUserRole } from '../services/supabase';
import { supabase } from '../supabaseClient';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from '../components/login-form';


const Login = () => {
  const navigate = useNavigate();
  const { signIn} = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signInError ,data} = await signIn(
        formData.email,
        formData.password,
      );
      // get user role
      const {role} =await getUserRole(data.user.id)

      if (signInError) throw signInError;
      // redirection
      if(role === 'admin') navigate('/admin')
      if(role === 'student') navigate('/student')
      if(role === 'teacher') navigate('/teacher/courses')
      
        toast.success(`login successfully as ${role}`);
    } catch (err) {
      setError(err.message);
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleAuth = async ()=>{
    try {
      const { data,error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5173/homepage',
        },
      })
      
      console.log(data)
      // toast.success("google auth successfully")

    }catch (error) {
      console.log(error)
    }finally{

    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Button type='button' variant='outline' className="w-full" onClick={handleGoogleAuth}>
              Google Auth
            </Button>
          </form>
          <br />
          {error && <Error error={error} />}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary/90">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
    // <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    //   <div className="w-full max-w-sm md:max-w-3xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl ">
    //     <LoginForm />
    //   </div>
    // </div>
  );
};

export default Login;