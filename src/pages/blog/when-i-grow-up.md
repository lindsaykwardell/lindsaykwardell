---
slug: "/when-i-grow-up"
date: 2020-05-18
title: "When I Grow Up..."
author: "Lindsay Wardell"
image: "/blog/mp.jpg"
tags:
  - Web Development
  - Personal
snippet: "What do you want to be when you grow up?"
layout: '../../layouts/BlogPost.astro'
---

**"What do you want to be when you grow up?"** 

This age-old question, asked of children before they can know what 'grow up' even means exactly, often results in answers both cute and curious. Some of the answers I remember giving include:

- Astronaut
- Mathematician _(due to a TV show we watched in 1st grade)_
- Teacher
- Office Max employee _(well, I got to do that one!)_
- Author

One theme popped out from an early age, though: whatever I was going to do, it was going to revolve around computers.

Software development has always been something I was interested in. I remember being awed by an early version of Excel at a science fair, and how you could program it to do whatever you wanted. A friend and I explored making fan games with GUI game designers like The Games Factory or Multimedia Fusion. We spent countless hours trying to put together fan games for Sonic the Hedgehog and other characters, or trying to make our own. I went to Cybercamps, a computer camp which offered weeklong courses on game development, programming, graphic design (Photoshop), and web design.

In 2002, we realized that we could look at the source code for a website, change it, save it, and open it in our browsers. It wasn't long after that that I got some books on HTML4 and CSS2, and started writing my own code. We made websites hosted on Freewebs, and I was able to use the HTML sections they offered to do some things myself.

From there, I started setting up websites for gaming clans I was a part of. I would download an HTML template, put it on the server my family rented, and _bam_! Website for the clan. It felt great. At the time, I wrote for a school assignment, "What I want for a career is to be a website designer."

![School paper stating I want to be a website designer](/blog/when-i-grow-up.jpg)

In 2005, my friend started a new fan game based on Shadow the Hedgehog. As a "company" making the game, he came up with the title, "Blackarms Studios" (a reference to the race of aliens in the Shadow the Hedgehog game, the Black Arms). And so, I made a website. We hosted it on Yagaboosh.com, which was derived from a random word/sound that I made as a child one day. We set up a community forum using ProBoards, and others from the fan game community made their way in. Later, my friend shifted to focus on making videos for YouTube. At one point, our channel was regularly reaching YouTube's top 100. Bear in mind, this was back in the day when YouTube videos couldn't be longer than 10 minutes.

Other members of the community wanted websites, so I started working with them to create and host something based on the template I had made for BAS. I then billed myself as running "The Yagaboosh Network" (everything was a URL based off of my original website, Yagaboosh.com) It was a blast. I dove straight into using CSS for styling the website, while ensuring the structure functioned without a stylesheet. I used CSS hover effects to generate dropdown menus. I avoided Javascript at the time, because it seemed intimidating and there were general concerns about compatibility across browsers.

Sadly, I don't have the original sites any more, but the Wayback Machine managed to archive some of my efforts. Looks like a large portion of the styling was misssed, though.

![Screenshot from the Wayback Machine of Blackarms Studios](/blog/blackarms-studios.png)

The community was amazing. It was probably my favorite part of the site. But I was never happy was using ProBoards, because it didn't integrate with the main site and I couldn't style it nearly as well. So in 2007, we migrated from ProBoards to a self-hosted solution with PHPBB. Over the following months, I tweaked the PHPBB theme to treat the global announcements as a blog, and finally my dream of merging the two was complete. This was my first real experience with "back-end web development" - I was writing my own PHP code, as well as the special PHPBB syntax, in order to make my own product.

The community slowly faded away, as things do. Our peak was in 2008, according to the stat counter I placed on the site (still accessible, thanks again to the Wayback Machine). Considering we were a small community site, I'm fairly proud of these numbers.

![Stat counter statistic for Blackarms Studios](/blog/blackarms-studios-stats.png)

Activity on the site dropped off after 2009. The YouTube channel had been repeatedly banned for violating DMCA regulations (this was before video game companies realized that fan content was a good thing). Part of this decline was because of my focus on the web technologies, rather than supporting the community, but also because we had been around for 4-5 years. The old members moved on, while no new members were joining.

We kept talking about what to do for the website until 2011, when I left for Brazil for two years as a missionary. During the mission, I was appointed financial secretary, which meant I worked from 10 to 5 in the mission office. Within my first month, my web development came up in conversation, and I gave an example of how easy it was to get started making a website. I kept playing with it when I had a spare moment, and was able to arrange a public release of the website.

The site was written as a custom CMS, because I didn't have access to tool like Wordpress or PHPBB. It was my first attempt at a PHP application. The banner at the top was randomly selected from between 5 options. A blog was included to display the mission's monthly message. Other features included fading between images using Javascript (I believe I used jQuery) and a scroll on the left with "Scriptures of Power". The scroll in the screenshot below is sadly broken, but it involved some complicated PHP code that allowed the scroll to animate downward to display all of the text. This was complicated because to achieve the animation, I was counting the number of characters in the quote, and then generating the CSS within PHP.

Thanks again to the Wayback Machine for the archived version of the site.

![Goiania Brazil Mission website](/blog/missao-brasil-goiania.png)

It was my first custom project, and I was very excited about it. But as with many side projects, I was unsatisfied with some of the initial decisions I had made. These constraints made it difficult to expand on the site, and I felt there had to be a better way. So I started over, updating the site as needed while I worked in the office, but truly focusing on the new project - Yagaboosh.

Yagaboosh was going to be a completely flexible CMS, built around a plugin system. Everything was going to be plugins, including the blog functionality, so that features could be updated separately or ignored if not wanted. This concept had formed in my head from the years of working on Wordpress and PHPBB - wouldn't it be great if I could just pick and choose which tools I used, and put them together in a cohesive way?

I feel like the project had a lot of potential, but eventually I was transferred away from the office. I took the source code with me, but when I got home in October 2013 I didn't feel like working on it all that much. I did some minor adjustments in 2014, but then I got married, and life priorities had to be shifted around. I later did some further updates, mostly to the theme (I switched to using Bootstrap instead of a custom theme), and pushed it to deployment.

![New Yagaboosh install page](/blog/yagaboosh.png)

Between 2014 and 2017, I didn't do much in the way of programming. I worked as a tech specialist at Office Depot while studying for my Associate's Degree without really knowing what I wanted to do. In 2015, our daughter was born, I started working on my Bachelor's degree, and I switched jobs to be an IT Manager at Lindsey Forwarders.

Most of my time there was working there was spent on day-to-day operations, and for a time I filled the role of Operations Manager rather than focusing on IT. But I did get to deploy a PHP-based time tracking system, and did some work on an existing internal application made using Magic from around 1995. I also got to make an Excel spreadsheet for tracking rates.

In 2017, the business was sold to a son-in-law, and I began to prepare to leave the company. A friend recommended attending the Tech Academy, a programming boot camp in Portland, OR. I made an arrangement to work part time while attending the boot camp, and in return I would start developing a new application to replace the existing one from 1995. I attended the Tech Academy from November 2017 to February 2018, learning the more professional side of development I had never had due to my self-taught method up until then.

At the Tech Academy, I learned about Git, Javascript/jQuery, and how to build server-side applications that weren't just based on PHP scripts - specifically, ASP.NET and C# MVC. I also got to experiment with Knockout.js, and saw the power of a single-page application. These methods and technologies would prove essential to my career.

For the rest of 2018, I switched between helping the new owner adjust to the company he had bought and working on new development projects. The two main projects were a new Wordpress site for the company, and the Online Portal that was intended to replace the old desktop app. The Wordpress site used an existing theme, but I was able to use my skills from the Tech Academy and past experience to style it how I wanted. I also got to make a new logo for the company, using Photoshop.

![Lindsey Forwarders home page](/blog/lindsey-forwarders.png)

The Online Portal was much more exciting. I started a prototype in 2017 while still attending the Tech Academy. The prototype was built using PHP and jQuery, and applied as close to MVC functionality as I could manage. There were dynamic Javascript imports depending on the page, REST endpoints for performing actions, and dynamic page rerenders as tasks were done. But as with the mission blog, it wasn't scalable. On top of that, there was a severe performance hit when querying the database via PHP that I couldn't figure out. Looking back, I think I was using an older version of PHP which caused it, but I'm still not certain.

After I completed the Tech Academy, I started trying to learn React, but was quickly overwhelmed by the number of new concepts I was trying to wrap my head around. Instead of continuing with React, I switched to Vue, and found a Javascript framework that was much more comfortable to get started with. I also started learning Node.js, and I realized how powerful it was to use one language for the entire application. The shift between PHP and Javascript during the prototyping phase had been annoying, especially since both are dynamic languages.

In May/June 2018, I built a new prototype using Vue and Node.js. I just replicated one page, the one where the database query was too slow. The result - a 4x performance increase, at minimum; often it was even more than that. I made the case to my boss to allow the shift from PHP/jQuery to Node/Vue, and he agreed. By this point, we had been in a closed pilot with a few customers, so we made the decision to support the old version while working on the new one. It was only a short time later that we were ready to switch. I was very impressed with the speed of development on the Vue/Node application compared to PHP/jQuery.

I continued working on the new application through the year, and into the start of 2019. However, in February 2019, I was contacted by a recruiter to see if I was interested in a position with Daimler Trucks North America, building a new project using Vue and Node. The interview was great, and they offered me the job. I immediately accepted. I started at DTNA in March, 2019.

![Me in the elevator at my new job](/blog/mp-elevator.jpg)

Working in a large corporation as a developer was a major shift from anything I had done before. I worked under my project manager (the same with whom I interviewed), along with a BSA assigned to my project. My contact information was intentionally kept from the app owner, so that all communication was routed through the BSA. We had regular meeting with architecture and CI/CD teams. I had to coordinate between other teams to call APIs needed to make our application work. All things I had either done myself, or had documentation to follow. 

I worked on that first project from March to June, 2019. It was an internal tool, so it wouldn't have a large user base. Also, once I had the position, I learned that I would need to write the application using Java, not Node. I had never written a single line of Java. I asked for the time to learn sufficient to write the application, which I received, and was able to complete the project a month ahead of time.

This turned out to be a good thing, because I was transferred to a new project where a developer was being transferred. This project was no small internal app - I'm actually not going to talk about it much because I'm not sure what I can say officially. I will say that, in many ways, it is the culmination of everything I have learned up until this point - database design, application development, working with teams, using version control and branches, and more. When the application goes live, and is used by its intended audience, it will be my code, along with that of my fellow developers, that is making magic happen.

There is more to the story - side projects, frustration, growing pains, and more. The path I have taken to get here was never straightforward. But in the end, I am doing what I love.

In 2002, I dreamed of being a website designer. Today, I know that I made that happen.

So now, I'll ask you:

**"What do you want to be when you grow up?"** 