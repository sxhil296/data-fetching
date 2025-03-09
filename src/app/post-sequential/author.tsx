type Author = {
  id: number;
  name: string;
};
export default  async function Author({ userId }: { userId: number }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const author: Author = await response.json();
  return (
    <div className="flex justify-start gap-2 text-purple-600">
        <p>By:</p>
        <p>{author.name}</p>
    </div>
  )
}
