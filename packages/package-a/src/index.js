import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
});

function App() {
  const { handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(() => console.log("submit"))}>
      <button type="submit">Submit</button>
    </form>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
