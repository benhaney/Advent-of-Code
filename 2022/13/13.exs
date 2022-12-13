defmodule Day13 do
  def part1(input) do
    input
    |> Enum.map(fn [l,r]-> compare(l,r) end)
    |> Enum.with_index(1)
    |> Enum.filter(&match?({:lt, _}, &1))
    |> Enum.map(&elem(&1, 1))
    |> Enum.sum()
  end

  def part2(input) do
    input
    |> Enum.concat()
    |> Enum.concat([[[2]],[[6]]])
    |> Enum.sort(Day13) # lmao
    |> Enum.with_index(1)
    |> Enum.filter(fn {x,_} -> x == [[2]] || x == [[6]] end)
    |> Enum.map(&elem(&1, 1))
    |> Enum.product()
  end

  def parse(input) do
    input
    |> String.split("\n\n", trim: true)
    |> Enum.map(fn line ->
      String.split(line)
      |> Enum.map(fn x ->
        Code.eval_string(x)
        |> elem(0)
      end)
    end)
  end

  def compare(l, r) when is_integer(l) and is_integer(r) and l < r, do: :lt
  def compare(l, r) when is_integer(l) and is_integer(r) and l == r, do: :eq
  def compare(l, r) when is_integer(l) and is_integer(r) and l > r, do: :gt
  def compare(l, r) when is_integer(l), do: compare([l], r)
  def compare(l, r) when is_integer(r), do: compare(l, [r])
  def compare(l, r) do
    Enum.zip(l, r)
    |> Enum.reduce_while(:eq, fn {l, r}, _ ->
      case compare(l,r) do
        :eq -> {:cont, :eq}
        other -> {:halt, other}
      end
    end)
    |> case do
      :eq ->
        cond do
          length(l) < length(r) -> :lt
          length(l) > length(r) -> :gt
          true -> :eq
        end
      other -> other
    end
  end
end

input = "input" |> File.read!() |> Day13.parse()

input
|> Day13.part1()
|> IO.puts()

input
|> Day13.part2()
|> IO.puts()
