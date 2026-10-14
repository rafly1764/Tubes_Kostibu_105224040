import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FormLogin from "../../components/FormLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <Header />

      <main className="grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-600">Admin Kosibu</h2>
            <p className="text-gray-500 mt-2">Silakan masuk untuk mengelola kamar</p>
          </div>
          
          <FormLogin />
          
        </div>
      </main>

      <Footer />
    </div>
  );
}