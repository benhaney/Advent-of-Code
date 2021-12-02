input =
  File.stream!("input")
  |> Stream.map(&String.split(&1, " "))
  |> Stream.map(fn [ins, amt] -> {ins, Integer.parse(amt)} end)
  |> Stream.map(fn {ins, {amt, _}} -> {ins, amt} end)

Enum.reduce(input, {0, 0}, fn
  {"down", x}, {h, d} -> {h, d + x}
  {"up", x}, {h, d} -> {h, d - x}
  {"forward", x}, {h, d} -> {h + x, d}
end)
|> Tuple.product()
|> IO.puts()

Enum.reduce(input, {0, 0, 0}, fn
  {"down", x}, {h, d, a} -> {h, d, a + x}
  {"up", x}, {h, d, a} -> {h, d, a - x}
  {"forward", x}, {h, d, a} -> {h + x, d + (x * a), a}
end)
|> Tuple.delete_at(2)
|> Tuple.product()
|> IO.puts()
