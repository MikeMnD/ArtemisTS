ArtemisTS
=========

A TypeScript port of the Entity System Framework Artemis.

down is copy from topic from here:
http://www.html5gamedevs.com/topic/253-artemists-typescript-port-of-artemis-entity-system-framework/



SOME WORDS:


This is alpha release, and i didn't make any game yet, but i share the project and code because:

 

1. Its open source

2. It's a core framework (no things like rendering, input, collisions or physics)

3. It's TypeScript (which is still in development) but if you see the compiled JavaScript i think you're liked it

3. There was some struggles in the process of porting so i\ll be more than happy if some folks help me with

code reviews, and suggestions also there is some changes to be expected when TypeScript add the generics feature

4. Some custom solutions for classes like Hashmap, BitSet, and ImmutableBag  they are array based and there is a big chance

that something is buggy

 

More technical info about use:

 

VisualStudio is used as IDE in my project and every .ts file is build to .js (but you can compile it with what you want)

the AMD module pattern to load classes, also i've made an App class in which for test

and probably for future use i included the: dat.gui as example how can other JS libraries can be imported.

 

STARTING THE GAME :) (the app or whatever)

 

Well if you download the github code it should just work try open the index.html

and check if the console output something like this:

 
document ready App.ts:68
app started App.ts:34
construct a logger

 

So if all is ok without errors you could type: mg and hit enter and it the console should print you the Game object which is supposed to be singletone.

 

SOME MORE WORDS:

 

It,s 2 am and I'm going to sleep, I've been working on this for several weeks (I'm new to TypeScript, and also new to entity component design but i think i love both)


So I hope more developers are interested in this and with the help of the community to make a solid game framework on which anyone could build his own game specific engine.


I'm going to write more about the feature and also my plan is to expand the code in new project which will be fully featured game engine but based on ArtemisTS so ArtemisTS is going to be relative small and just a core.
 

Also there is a DART port of Artemis which even has two examples, I've been looking closely to their structure so my goal is to make one example for ArtemisTS too.  