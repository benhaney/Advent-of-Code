defmodule Main do
  @input File.stream!("input") |> Stream.map(&String.trim/1) |> Stream.map(&String.to_integer/1) |> Enum.to_list()

  defp f(n), do: max(0, floor(n / 3) - 2)

  defp g(n) when n <= 0, do: 0
  defp g(n), do: f(n) + g(f(n))

  def main() do
    {
      @input |> Enum.map(&f/1) |> Enum.sum(),
      @input |> Enum.map(&g/1) |> Enum.sum()
    }
  end
end
