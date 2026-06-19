import { useSearchParams, useNavigate } from 'react-router-dom';

export default function BookingResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const msg = searchParams.get('msg');

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100">
      <div className="glass p-8 rounded-2xl text-center max-w-md w-full mx-4 shadow-2xl">
        {status === 'success' ? (
          <>
            <div className="mx-auto w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">Booking Successful!</h1>
            <p className="text-zinc-400 mb-8">Your parking slot has been successfully reserved for the requested duration.</p>
          </>
        ) : (
          <>
            <div className="mx-auto w-16 h-16 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mb-4 border border-rose-500/50">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h1 className="text-3xl font-bold text-rose-500 mb-2">Booking Failed</h1>
            <p className="text-zinc-400 mb-8">{msg || 'We could not process your reservation. The slot might be already taken.'}</p>
          </>
        )}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl text-white font-bold shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
