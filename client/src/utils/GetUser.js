function getUserDetail() {
  const user = localStorage.getItem("todoAppUser");
  return user ? JSON.parse(user) : null; // Trả về null nếu không có user
}

export default getUserDetail;
