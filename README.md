# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. Functionality: Handling Quotes (came from both) 

    "As a user of the CSV parser, I can include a string with commas as long as it is enclosed within quotations without it being parsed as individual elements. The quotes are not included in the parsed string"

    Acceptance Criteria: 

    2. Functionality: Handling Headers (came from both)

    "As a user of the CSV parser, I can provide data with and without a header. If my data comes with a 
    header, I specify that to the parser and the header is ignored in the resulting parsed data." 

    3. Extensibility: Type coercion + Error reporting (came from both)

    "As a user of the CSV parser, if I provide data with inconsistent types for each header the CSV parser notices and reports the inconsistent data type back to me." 

    4. Extensibility: Inconsistent lengths + Error reporting (came from LLM)

    "As a user of the CSV parser, if I provide data of differing lengths, the CSV parser reports back that there are length inconsistencies" 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas were to make the caller of the function specify if there is a header, ensure that quoted commas are handled properly, and the CSV parser can enforce type constraints if given a header. The LLM initally suggested custom delimiters, newline handling, non-UTF encoding supports,and inconsistent length error tolerance, as well as type conversion and quote handling. There was some overlap between what I initially thought of, as well as some new bugs I missed like inconsistent lengths and newline handling. On the other hand custom delimiters and non-UTF encoding support is a low priority change  for a simple CSV parser. The more abstract questions I asked, the more general and key features it suggested, while also suggesting unneeded next steps that went out of the scope of this project 

### Design Choices

### 1340 Supplement

- #### 1. Correctness
A good CSV parser is 'correct' if it has the following properties: 
- Maintains the integrity of data and maintains consistent data types amongst columns
- Report when the CSV parser recieves bad data that causes a violation of this integrity 
- Handle a variety of different schemas and generic types 
- Handle headers 
- Handle quoted strings
- Handle whitespace
- more broadly, a good CSV parser is tailored to the type of application it is being deployed 
so should be easily extensible for multiple contexts 

- #### 2. Random, On-Demand Generation
This random source of data could expand the power of testing because it can test a variety 
of different schemas and types without having to hand write individual tests with custom CSV files. 
If it could randomly generate typos and errors, then more general cases and bugs could be tested,
while edge cases may still need to be manually checked for. 

- #### 3. Overall experience, Bugs encountered and resolved
This sprint differed from prior programming assignemtns through its AI policy and focus on testing
before development. I was surprised by the prompted use of AI, and appreciated testing an existing 
application before immediately adding new functionality. I encountered a few bugs during work that 
were mostly syntax related as I got used to workign in TypeScript. I addressed these by either looking
up the syntax or referencing the cs32 TypeScript guide. 


#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
