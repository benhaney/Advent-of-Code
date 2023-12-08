defmodule Day08 do
  def part1({seq, rules}) do
    seq
    |> Stream.cycle()
    |> Stream.with_index()
    |> Enum.reduce_while("AAA", fn
      {_op, i}, "ZZZ" -> {:halt, i}
      {op, _i}, acc -> {:cont, rules |> Map.get(acc) |> Enum.at(op)}
    end)
  end

  def part2({seq, rules}) do
    rules
    |> Map.keys()
    |> Enum.filter(&String.ends_with?(&1, "A"))
    |> Enum.map(fn key ->
      seq
      |> Stream.cycle()
      |> Stream.with_index()
      |> Enum.reduce_while(key, fn
        {_op, i}, <<_::binary-2, "Z">> -> {:halt, i}
        {op, _i}, acc -> {:cont, rules |> Map.get(acc) |> Enum.at(op)}
      end)
    end)
    |> lcm()
  end

  def parse(input) do
    input
    |> String.split("\n\n", trim: true)
    |> then(fn [seq, rules] ->
      {
        seq
        |> String.split("", trim: true)
        |> Enum.map(fn "L" -> 0; "R" -> 1 end),
        rules
        |> String.split("\n", trim: true)
        |> Enum.map(fn <<x::binary-3, " = (", y::binary-3, ", ", z::binary-3, ")">> -> {x,[y,z]} end)
        |> Map.new()
      }
    end)
  end

  defp gcd(a, b) when a == 0 or b == 0, do: a + b
  defp gcd(a, b), do: gcd(b, rem(a,b))
	
  defp lcm([a, b]), do: div((a*b), gcd(a,b))
  defp lcm([a | rest]), do: lcm([a, lcm(rest)])
end

input = "input" |> File.read!() |> Day08.parse()

input
|> Day08.part1()
|> IO.puts()

input
|> Day08.part2()
|> IO.puts()
