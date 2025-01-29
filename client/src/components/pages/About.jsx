import react from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="bg-primary flex items-center pt-16 flex-col text-white font-serif">
            <h1 className="text-6xl mb-2 text-center">What the flippity flap is Loogle??</h1>
            <p>Urm. what the heck.</p>
            <p className="pl-64 mt-32 rotate-45">Sccoooooby dooby doo. i love you</p>
            <p className="pr-96 mt-16 -rotate-[30deg]">This about page mid as hell bro 🤣</p>
            <p className="mt-48 font-bold">Alright alright. enough jibber jabber ↓</p>
            <div className="flex flex-col mb-16 mt-16 pl-8 md:pl-16 w-full [&>h1]:text-2xl [&>h1]:underline [&>h1]:mb-4 [&>h1]:mt-4 [&>h1]:text-white [&>p]:text-gray-300">
                <h1>What is Loogle?</h1>
                <p>A search engine, just like Google (Google is a search engine, named after this website)</p>
                <h1>How is it different?</h1>
                <p>You sign in through Google and then you can input your interests on your <Link to="/profile" className="underline">profile page</Link></p>
                <p>Then, every time you visit the search engine, the page will magically generate a random fun fact/theorem about one of your interests</p>
                <h1>So I can enter anything as an interest?!</h1>
                <p>Nah sorry dawg. Turns out Gemini can't just generate any ol' theorems about <a href="https://www.youtube.com/watch?v=G5SoMa3t4qQ" target="_blank" rel="noreferrer" className="underline font-bold">ooga booga boogie</a></p>
                <p>(Though it does make for an absolute banger of a piano piece by Nancy and Randall Faber Level 1b Jazz !)</p>
                <h1>Wait but it won't even let me add some of the recommended interests?</h1>
                <p>Yeah... that's an annoying bug. I tried some simple solutions but they didn't work. If I had more time I'd come up with a better solution</p>
                <p>("if i had more time" ...  funny concept right?)</p>
                <h1>Are there repeat fun facts displayed on main page?</h1>
                <p>Shouldn't be</p>
                <h1>Ok how do i go back to home page i need to search for more Faber classics</h1>
                <p>Right <Link to="/sike" className="underline">here</Link> i gotchu dawg</p>
            </div>
        </div>
    );
};

export default About;