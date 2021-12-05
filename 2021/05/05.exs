# input parsing
input =
  File.read!("input")
  |> String.split("\n", trim: true)
  |> Enum.map(&Regex.run(~r/^(\d+),(\d+) -> (\d+),(\d+)$/, &1, capture: :all_but_first))
  |> Enum.map(fn line -> Enum.map(line, &String.to_integer/1) end)
  |> Enum.map(fn [x1, y1, x2, y2] -> [{x1, y1}, {x2, y2}] end)

# helper functions
diagonal? = fn [{x1, y1}, {x2, y2}] -> x1 != x2 and y1 != y2 end

intersections = fn lines ->
  lines
  |> Enum.map(fn
    [{x, y1}, {x, y2}] -> Enum.zip(Stream.cycle([x]), y1..y2)
    [{x1, y}, {x2, y}] -> Enum.zip(x1..x2, Stream.cycle([y]))
    [{x1, y1}, {x2, y2}] -> Enum.zip(x1..x2, y1..y2)
  end)
  |> List.flatten()
  |> Enum.frequencies()
  |> Enum.filter(&(elem(&1, 1) > 1))
  |> Enum.count()
end

# part 1
input |> Enum.reject(diagonal?) |> intersections.() |> IO.puts()

# part 2
input |> intersections.() |> IO.puts()
