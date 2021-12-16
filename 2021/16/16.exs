defmodule AoC do
  def parse(<<ver::3, 4::3, rest::bitstring>>), do: parse_literal(rest) |> wrap(ver, 4)
  def parse(<<ver::3, type::3, 0::1, bits::15, rest::bitstring>>), do: parse_op(rest, {:bits, bits}) |> wrap(ver, type)
  def parse(<<ver::3, type::3, 1::1, count::11, rest::bitstring>>), do: parse_op(rest, {:count, count}) |> wrap(ver, type)

  def version_sum({n, _, x}) when is_list(x), do: n + Enum.sum(Enum.map(x, &version_sum/1))
  def version_sum({n, _, _}), do: n

  def compute({_, 0, pkts}), do: pkts |> Enum.map(&compute/1) |> Enum.sum()
  def compute({_, 1, pkts}), do: pkts |> Enum.map(&compute/1) |> Enum.product()
  def compute({_, 2, pkts}), do: pkts |> Enum.map(&compute/1) |> Enum.min()
  def compute({_, 3, pkts}), do: pkts |> Enum.map(&compute/1) |> Enum.max()
  def compute({_, 4, literal}), do: literal
  def compute({_, 5, [p1, p2]}), do: if(compute(p1) > compute(p2), do: 1, else: 0)
  def compute({_, 6, [p1, p2]}), do: if(compute(p1) < compute(p2), do: 1, else: 0)
  def compute({_, 7, [p1, p2]}), do: if(compute(p1) == compute(p2), do: 1, else: 0)

  defp wrap({val, rest}, ver, type), do: {ver, type, val, rest}

  defp parse_literal(data) do
    {bits, rest} = do_parse_literal(data)
    len = bit_size(bits)
    <<literal::integer-size(len)>> = bits
    {literal, rest}
  end

  defp do_parse_literal(<<0::1, bits::binary-unit(1)-size(4), rest::bitstring>>), do: {bits, rest}
  defp do_parse_literal(<<1::1, bits::binary-unit(1)-size(4), rest::bitstring>>) do
    {more, rest} = do_parse_literal(rest)
    {<<bits::bitstring, more::bitstring>>, rest}
  end

  defp parse_op(data, {_, 0}), do: {[], data}

  defp parse_op(data, {:count, cnt}) do
    {ver, type, pkt, rest} = parse(data)
    {pkts, rest} = parse_op(rest, {:count, cnt - 1})
    {[{ver, type, pkt} | pkts], rest}
  end

  defp parse_op(data, {:bits, bits}) do
    {ver, type, pkt, rest} = parse(data)
    {pkts, rest} = parse_op(rest, {:bits, bits - (bit_size(data) - bit_size(rest))})
    {[{ver, type, pkt} | pkts], rest}
  end
end

{ver, type, pkt, _rest} = File.read!('input') |> Base.decode16!() |> AoC.parse()
decoded = {ver, type, pkt}

decoded |> AoC.version_sum() |> IO.puts()
decoded |> AoC.compute() |> IO.puts()
