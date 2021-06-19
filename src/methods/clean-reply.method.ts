export function cleanReply(s: string): string {
  return (s ? s.split('\n')
    .filter(item => item.includes('Posted using [Partiko') === false)
    .filter(item => item.includes('Posted using [Dapplr') === false)
    .filter(item => item.includes('Posted Using [LeoFinance') === false)
    .filter(item => item.includes('Posted via [neoxian') === false)
    .filter(item => item.includes('Posted with [STEMGeeks') === false)
    .filter(item => item.includes('Posted using [Bilpcoin') === false)    
    .filter(item => item.includes('<center><sub>[Posted Using Aeneas.Blog') === false)
    .filter(item => item.includes('<center><sub>Posted via [proofofbrain.io') === false)
    .filter(item => item.includes('<center>Posted on [HypnoChain') === false)
    .filter(item => item.includes('<center><sub>Posted via [weedcash.network') === false)
    .filter(item => item.includes('<center>Posted on [NaturalMedicine.io') === false)
    .filter(item => item.includes('<center><sub>Posted via [MusicForLife.io') === false)
    .filter(item => item.includes('If the truvvl embed is unsupported by your current frontend, click this link to view this story') === false)
    .filter(item => item.includes('<center><em>Posted from Truvvl') === false)
    .filter(item => item.includes('View this post <a href="https://travelfeed.io/') === false)
    .filter(item => item.includes('Read this post on TravelFeed.io for the best experience') === false)
    .filter(item => item.includes('Posted via <a href="https://www.dporn.co/"') === false)
    .join('\n') : '')
    .replace('Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
    .replace('<div class="pull-right"><a href="/@hive.engage">![](https://i.imgur.com/XsrNmcl.png)</a></div>', '')
}
