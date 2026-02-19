import { Outlet } from 'react-router';

export function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Outlet />
    </div>
  );
}
