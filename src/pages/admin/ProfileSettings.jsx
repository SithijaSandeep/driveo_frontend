import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  function saveUsername(e){
    e.preventDefault();
    // in real app, call API
    alert('Username updated to: ' + username);
  }

  function changePassword(e){
    e.preventDefault();
    if(!currentPwd || !newPwd) return alert('Please fill all password fields');
    if(newPwd !== confirmPwd) return alert('New password and confirm do not match');
    // call API to change password
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    alert('Password changed (demo)');
  }

  function logout(){
    try{ localStorage.removeItem('auth'); }catch(e){}
    navigate('/login');
  }

  return (
    <div>
      <div className="rounded-lg bg-white p-6 shadow-sm max-w-3xl">
        <h2 className="text-2xl font-extrabold">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Update your admin profile information and password</p>

        <section className="mt-6 rounded-md border border-gray-100 p-4">
          <h3 className="font-medium mb-3">Account</h3>
          <form onSubmit={saveUsername} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input value={username} onChange={(e)=>setUsername(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 text-sm" />
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white text-sm">Save Username</button>
          </form>
        </section>

        <section className="mt-6 rounded-md border border-gray-100 p-4">
          <h3 className="font-medium mb-3">Change Password</h3>
          <form onSubmit={changePassword} className="space-y-3 max-w-md">
            <div>
              <label className="block text-xs text-gray-600">Current Password</label>
              <input type="password" value={currentPwd} onChange={(e)=>setCurrentPwd(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-600">New Password</label>
              <input type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Confirm New Password</label>
              <input type="password" value={confirmPwd} onChange={(e)=>setConfirmPwd(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white text-sm">Change Password</button>
              <button type="button" onClick={logout} className="rounded-md border border-gray-200 px-4 py-2 text-sm">Logout</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
