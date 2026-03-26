import { Sparkles } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => (
  <div className="min-h-screen bg-[#06231D] flex items-center justify-center px-4">
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2.5 bg-[#E3EF26]/10 rounded-xl mb-3">
          <Sparkles className="text-[#E3EF26]" size={26} />
        </div>
        <div className="text-[#F5F5F0] font-bold text-2xl mb-2">
          SmartSpend
        </div>
        <p className="text-gray-400 text-sm">Create your free account</p>
      </div>
      <div className="bg-[#0C342C] rounded-2xl shadow-lg border border-[#076653]/50 p-8">
        <RegisterForm />
      </div>
    </div>
  </div>
);

export default RegisterPage;
