# input parsing
[nums | boards] = File.read!("input") |> String.split("\n\n")
nums = nums |> String.split(",") |> Enum.map(&String.to_integer/1)
boards =
  Enum.map(boards, fn board ->
    board
    |> String.split("\n")
    |> Enum.map(fn row ->
      row
      |> String.split(" ", trim: true)
      |> Enum.map(&String.to_integer/1)
    end)
  end)

# helper functions
mark = fn (boards, n) -> update_in(boards, [Access.all(), Access.all(), Access.all()], fn ^n -> nil; x -> x end) end
win? = fn board -> [board, Enum.map(Enum.zip(board), &Tuple.to_list/1)] |> Enum.any?(fn b -> Enum.any?(b, fn r -> Enum.all?(r, &is_nil/1) end) end) end
score = fn (board, n) -> board |> List.flatten() |> Enum.reject(&is_nil/1) |> Enum.sum() |> Kernel.*(n) end

# part 1
Enum.reduce_while(nums, boards, fn n, boards ->
  boards = mark.(boards, n)
  case Enum.find(boards, win?) do
    nil -> {:cont, boards}
    board -> {:halt, score.(board, n)}
  end
end)
|> IO.puts()

# part 2
Enum.reduce_while(nums, boards, fn
  n, [board] ->
    [board] = mark.([board], n)
    if win?.(board), do: {:halt, score.(board, n)}, else: {:cont, [board]}
  n, boards ->
    {:cont, boards |> mark.(n) |> Enum.reject(win?)}
end)
|> IO.puts()
