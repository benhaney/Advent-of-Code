input = File.read!("input") |> String.split(",") |> Enum.map(&String.to_integer/1)

index = Enum.reduce(input, List.duplicate(0, 9), &List.update_at(&2, &1, fn n -> n+1 end))

days = fn n -> Enum.reduce(1..n, index, fn _, [a,b,c,d,e,f,g,h,i] -> [b,c,d,e,f,g,h+a,i,a] end) |> Enum.sum() end

IO.puts(days.(80))
IO.puts(days.(256))
