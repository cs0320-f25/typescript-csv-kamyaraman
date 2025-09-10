import { parseCSV } from "./basic-parser";
import {z} from "zod"; 


export const IcecreamRowSchema = z.tuple([z.string(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], price: tup[1]}))

export type Icecream = z.infer<typeof IcecreamRowSchema>;

const DATA_FILE = "./data/people.csv"; // update with your actual file name
const ICECREAM_FILE = "./data/icecream.csv"; 

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, undefined);
  try{
    const resultsWithSchema = await parseCSV(ICECREAM_FILE, IcecreamRowSchema); 
    for(const record of resultsWithSchema)
      console.log(record)
  }
  catch(e){
    console.error("Error parsing with zod schema" + e)
  }

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();