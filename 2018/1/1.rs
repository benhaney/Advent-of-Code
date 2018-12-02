use std::collections::HashSet;

let fn main() {
  let d : Vec<i32> = include_str!("input").lines().map(|x| x.parse().unwrap()).collect();
  let mut seen = HashSet::new();
  println!("{}\n{}",
    d.iter().sum::<i32>(),
    d.iter().cycle().scan(0, |a, b| { *a += b; Some(*a) }).find(|&x| !seen.insert(x)).unwrap()
  );
}
