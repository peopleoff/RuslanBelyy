---
title: 'Crafting My Digital Echo'
date: '2024-02-26'
description: 'Diving into the digital mirror: How I spent a weekend teaching an AI to echo my words, transforming conversations into a personalized language model.'
---
# Crafting My Digital Echo: A Weekend With Machine Learning

This weekend, I embarked on a fascinating journey into the world of machine learning, specifically, training a Language Learning Model (LLM) to mimic my writing style. As a casual online blog writer, I've always been intrigued by the potential of AI to personalize digital communication. Here's how I spent my weekend delving into the world of AI, armed with nothing but curiosity, a dataset of my conversations, and the vast resources of the internet.

### **The Quest for Data: Unearthing Conversational Gold**

The first step in my adventure was to find a dataset that was both large and personal enough to serve as the foundation for training the LLM. The perfect candidate? A Discord conversation between a friend and I. 

To extract this goldmine of data, I used a handy tool called DiscordChatExporter, available on GitHub. This tool allowed me to download our entire conversation history, Totally roughly 37k messages that I could use to train my model.

### **From Raw Data to Refined Training Material**

With the dataset in hand, the next challenge was to format the data into a structure that the LLM could learn from. 

After doing some research, it seemed that different model bases required data in different formats,

When fine-tuning on `llama-7b-chat`, the recommend formatting looked like this:

```json
{ "inputs": "<s>[INST] <<SYS>>\n{{ system_prompt }}\n<</SYS>>\n\n{{ user_message }} [/INST] {{ response }} </s>" }
```

For `nous-hermes2`, the recommend formatting looked like this:

```json
{ "inputs": "<s>### Instruction:\n{{ user_message }}\n\n### Response:\n{{ response }}</s>" }
```

This required a bit of coding finesse. I wrote a NodeJS script that read through each message, formatting them into a clean, digestible format depending on the LLM I was testing. This step was crucial for ensuring that the LLM could effectively learn from my conversational style.

### **The Toolbox: Assembling the AI Workshop**

Now, with my data ready, I needed to find the right tools for training the LLM. After some research online, most people seemed to recommend using [https://github.com/oobabooga/text-generation-webui](https://github.com/oobabooga/text-generation-webui). This project seemed like the perfect platform for my experiment, offering a user-friendly interface and the ability to download models directly from Hugging Face.

After getting it downloaded and up and running, I spent the next couple downloading various models, downloading over 100GB of models, testing out their responses to basic questions as a control.

Once we had the models downloaded and working, I started training the models and generating a **[LoRA (Low-Rank Adaptation of Large Language Models)](https://hf.co/papers/2106.09685).**

### **The Unexpected Turn: When AI Surprises You**

After days of preparation, it was finally time to put my meticulously trained LoRA model to the test. I was eager to see the model perform, to witness my digital echo come to life. However, the reality was not quite what I had anticipated.

The model's responses were unexpected and, in some cases, completely unrelated to the prompts. I was taken aback. Wasn't this the model that I spent hours training, feeding it my conversational data, expecting it to mimic my writing style accurately?

In the face of these unexpected results, I decided it was time to revisit my approach. I needed to dig deeper into the intricacies of Language Learning Models and perhaps seek guidance from the vast AI community online. This setback was not a dead-end but an opportunity to learn and grow. The journey to creating my digital echo was far from over, and I was ready to take on the challenges that lay ahead.

### **The Reality Check: Computational Power vs. Ambition**

After doing research, learning more about what it takes to actually fine tune a model, and gathering more and more training data, I quickly hit a roadblock. Running these models consumed 100% of my 3060 TI GPU resources for a single prompt reply. This was a sobering reminder of the computational demands of training LLMs.

Faced with the limitations of my hardware, I sought an online solution that could handle the heavy lifting. Google Colabs seemed like a good solution, it had an online workspace I could write code in and it offered different levels of GPU’s to help with my hardware problem.

Instead of battling with local models, I turned to Gradient.ai, a service that offered the ability to download base models, and fine tune them with their SDK. By using their platform, I could train and fine-tune the LLM in the cloud, sidestepping the need to run everything on my personal machine.

### **Reflections on a Weekend Well Spent**

This weekend was a deep dive into the practicalities of AI and machine learning. From wrestling with datasets to navigating the complexities of computational resources, the experience was both challenging and exhilarating. I emerged from the weekend with a deeper understanding of AI's potential and limitations, as well as a newfound appreciation for the cloud services that make modern AI accessible to enthusiasts like me. This journey was more than just a technical exercise; it was a step towards creating a digital reflection of myself, a testament to the power of technology to capture and replicate the nuances of human expression.