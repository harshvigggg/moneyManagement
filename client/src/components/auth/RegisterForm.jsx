import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      login(res.data.token, res.data.user);
      toast.success('Account created! Welcome to SmartSpend.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#F5F5F0] mb-1">Full Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/30 focus:outline-none focus:border-[#E3EF26] focus:shadow-[0_0_0_3px_rgba(227,239,38,0.1)]"
          placeholder="Harsh Singh"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0] mb-1">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/30 focus:outline-none focus:border-[#E3EF26] focus:shadow-[0_0_0_3px_rgba(227,239,38,0.1)]"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0] mb-1">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/30 focus:outline-none focus:border-[#E3EF26] focus:shadow-[0_0_0_3px_rgba(227,239,38,0.1)]"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F5F5F0] mb-1">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (val) => val === watch('password') || 'Passwords do not match',
          })}
          className="w-full px-3 py-2 bg-[#06231D] border border-[#076653]/50 rounded-xl text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/30 focus:outline-none focus:border-[#E3EF26] focus:shadow-[0_0_0_3px_rgba(227,239,38,0.1)]"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-[#E3EF26] hover:bg-[#D4E020] text-[#06231D] font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? <Spinner size="sm" /> : 'Create Account'}
      </button>

      <p className="text-center text-sm text-[#6B7280]">
        Already have an account?{' '}
        <Link to="/login" className="text-[#E3EF26] hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
