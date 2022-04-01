# LSF BOOST

*Simple tools taht boosts productivity and ease larning development!*

This document should present the relationship between buissness needs and a code. 

## Content

- [LSF BOOST](#lsf-boost)
  - [Content](#content)
  - [⚡ Trying to boost productivity in](#-trying-to-boost-productivity-in)
    - [🎨 Creating desings](#-creating-desings)
    - [🍕 Implementing desing](#-implementing-desing)
    - [📄 Code reuse](#-code-reuse)
    - [💻 Dev environment](#-dev-environment)
    - [💬 Defining intern DSL](#-defining-intern-dsl)
    - [👾 Learning and self growing](#-learning-and-self-growing)
  - [Understanding buissness needs](#understanding-buissness-needs)
    - [Stable solutions](#stable-solutions)
    - [Fast delivery](#fast-delivery)
    - [Constant workload](#constant-workload)
  - [Buissness needs in desing](#buissness-needs-in-desing)
  - [Buissness needs in code](#buissness-needs-in-code)
    - [Divide to conquer](#divide-to-conquer)
    - [Choose your tools](#choose-your-tools)
    - [Learn your tools](#learn-your-tools)

## ⚡ Trying to boost productivity in

### 🎨 Creating desings
Define design rules based on previous projects. Based on defined rules, try to predict does current website represents an exception to those rules, or it can be done useing existing rules(which speeds up process)

### 🍕 Implementing desing 
Define design rules based on previous projects. Raise an exceptions every time those rules are broken, see if rules should be changed, redesing current desing solution or it's just one time exception that needs an extra work!

### 📄 Code reuse
Eleminate as much side effect as possible from reusable code. Create starting point, because boilerplate code should always be reused. Create simple but stable solutions for common problems!

### 💻 Dev environment
Eleminate unnecessery tools from pipeline, use common dev tools. Use single IDE, integrate hot reload, easy integration with WP,...

### 💬 Defining intern DSL
Intern DSL(Domain Specific Language) brings uniqueness to used terms and phrases in daily buissness processes

### 👾 Learning and self growing
By understanding rules of the game that allow rules change, you can create your own game!


## Understanding buissness needs

### Stable solutions

### Fast delivery

### Constant workload


## Buissness needs in desing

## Buissness needs in code

By representing buissness needs in code we mean everything that is a core part of all buissness solutions should be reusable. We can create separation based on specific buissness needs.

### Divide to conquer

Partitioning code contexts by buissness needs:
- 🎁 Presentation
- 🔍 SEO
- 🍌 Integrations

These code contexts can be closer represented by dividing them into specific repeatable website parts:
- 🎁 Presentation
  - Home
  - FAQ
  - Contact us
  - About us
  - Gallery
- 🔍 SEO
  - Services
  - Blogs
  - Locations
- 🍌 Integrations
  - Quota form
  - Reviews ?
  - Google Maps

We can see that these contexts can commonly be cross referenced to fufill buissness needs(example: Blogs *slider* inside Home *page*).

Based on additional repeatable needs we can procede to devide those pars into smaller components:
- 🎁 Presentation
  - Home
    - Header
    - Section
    - Services
    - Page
    - Quota Form
    - Testamonials
  - ...
- 🔍 SEO
  - Services
    - Header
    - Section
    - Page
    - Tiles
  - ...
- 🍌 Integrations
  - ...

We can see that some parts are repeating again(example: *Header in Home and Services!*). So, by my experience, there are two ways to fix this problem. One is to see did we fail in defining code contexts(*should we include more high level parts?*). Only measurement to prove that you are right or wrong in defining code contexts is the measurement of code reusability in real world scenario. Which sadly means that if you don't know, you have to first implement the solution to see will it fit. Or do you? The other solution to this problem is trying to define intern Domain Specific Language based on your teams work. So we can try use term *Home Header* instead of just *Header*(that also can be for example another component reusable by the whole system). This seems like teaching a writer to write, but defining common words and phrases as a part of an intern DSL can be benefitial. Because of the nature of this non existing term as inner DSL, language used to define buissness in daily needs can be fluid, but it should be consisted of at least 90% common words and phrases. So by thinking should something become a part of the structure try to think how it should sound used in your inner DSL. By analysing daily talk about job, you can see patterns that may become integral parts of your code(or design) representation.

### Choose your tools

Find tools that solves your problems! ...or just create them!

Okay, we devided some parts of buissness as a reusable parts of code, but how to represent that code? This current structure is deeply nested and depends on fine buissness granulation which means that it's changable over time and also can be more or less complex depending on the implementation needs. So we need something that can easily be changed overtime, and also easy to integrate and use inside the existing team. Learning process should be small if none and expectations are high. Let's use file system! Represent those code parts as directories. It's simple, everyone knows how to use it, you ***only*** need to define some rules. Lets create our directory structure:

- 📁 Presentation
  - 📁 Home
    - 📁 Header
    - 📁 Section
  - ...
- 📁 SEO
  - 📁 Services
    - 📁 Header
    - 📁 Section
  - ...
- 📁 Integrations
  - ...



### Learn your tools

Learn CSS, JS, HTML, VS Code, NodeJS
Learn CSS libs, JS libs, Existing tools
LSF-BOOST!