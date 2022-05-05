import { StringifyOptions } from "querystring";
import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters: (s: string) => object = R.pipe(
    R.replace(/\s/g,""),        //syntax for deleting spaces
    stringToArray,              //given function
    R.countBy(R.toLower)        //ramda functions
);



/* Question 2 */

const outer = (s:string[],o:string,c:string):string[] =>
    R.isEmpty(s) ? [c]:
    R.head(s) === o ? R.tail(s) : R.prepend(c,s);

const Red = (s:string[], c:string): string[] =>
    c === "(" || c === "{" || c === "[" ? R.prepend(c,s) :  //if (/[/{ => add to start
    c === ")" ? outer(s,"(",c):                             //else if ) => remove existing ( if possible
    c === "}" ? outer(s,"{",c):                             //else if...
    c === "]" ? outer(s,"[",c):                             //else if...
    s;                                                      //else => return the string

export const isPaired: (s: string) => boolean = R.pipe(
    stringToArray,              //first we put all chars in array
    R.reduce(Red, []),          //reduce array so that
    R.isEmpty
);


/* Question 3 */
export interface WordTree {
    root: string;
    children: WordTree[];
}

const func = (t:WordTree) : string => 
    R.isEmpty(t.children) ?     //if has no sons
    t.root :                    //return root
    t.root + t.children.reduce((acc:string,subtree:WordTree): string =>acc +" " +func(subtree),"");    //else we add root + continue recursivly to children 


export const treeToSentence = (t: WordTree): string =>
    func(t);

