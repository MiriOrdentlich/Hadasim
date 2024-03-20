
function getHeight() {
   let height = parseInt(prompt("Enter height"));
  
    while (height < 2 || !height) {
      height = parseInt(
        prompt(
          "The height has to be >= to 2, Please enter again"
        )
      );
    }
    return height;
  }
  
  function getWidth() {
   let width = parseInt(prompt("Enter width"));
  
    while (!width || width <= 0) {
      width = parseInt(prompt("Wrong input type again"));
    }
  
    return width;
  }
function Get()
{
    let height =  getHeight();
    let width = getWidth();
    return {height,width }
}

function TriangularPerimeter()
{
    let {height,width } = Get()

    let side= Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height, 2));
    let perimeter = 3 * side;
    document.getElementById("output").innerHTML = "The Perimeter of the triangular is- " + perimeter ;


}
function printTriangular()
{
    let {height,width } = Get()
    if(width%2==0 || width>= height*2)
    {
        document.getElementById("output").innerHTML = "The triangular isn't possible" ;

    }
    else
    {
        let aMiddleLines = height-2; //amount Of Middle Lines
        let aMiddleGroups = (width + 1) / 2 -2 //amount of middle groups (a group is all lines with the same length)
        let aLinesInMiddleGroup = Math.floor((aMiddleLines)/aMiddleGroups); //amount of Lines In a Middle Group
        let spare = aMiddleLines - aLinesInMiddleGroup * aMiddleGroups; //amount of lines that are spare and need to go to aFirstMiddleG
        let aFirstMiddleG= aLinesInMiddleGroup + spare; //amount for the first middle group + spare
        let space= (width- 1) / 2; //space that needed in each line
        let StarsAmount = 1;
        let output = '';
        for(let i=0; i < aMiddleGroups + 2 ;i++)
        {
            if(i == 0 || i== aMiddleGroups + 1)
            {
                output = output + Print(space,1, StarsAmount);
            }
            else if(i == 1 )
            {
                output = output + Print(space,aFirstMiddleG, StarsAmount);
            }
            else
            {
                output = output + Print(space,aLinesInMiddleGroup, StarsAmount);
            }
            space--;
            StarsAmount = StarsAmount+  2;
        }
        document.getElementById("output").innerHTML = output 
    }
}

function Print(space, amount, StarsAmount)
{
    
    let output ="";
    for(let i=0; i< amount; i++) //amount of times to print each line
    {
        let st = ""; //star
        for(let k=0; k< StarsAmount; k++) //amount of spaces needed in the line
        {
            st = st + '*';
        }
        output =output + st + '<br>';

        /* For 'original' spacing and not by css: */
            //let sp = ""; //space
            // for(let j=0; j< space; j++) //amount of spaces needed in the line
            // {
            //     sp = sp + '&nbsp;';
            // }
            //output =output+ sp + st + '<br>';

    }
    return output ;

}
function Rectangular()
{
    let {height,width } = Get()
    let bigger  = Math.max(height,width);
    let smaller = Math.min(height,width);
    let print;

    if (height == width || bigger- smaller > 5)
    {
        print= height * width;
        document.getElementById("output").innerHTML = "The area of the rectangular is- " + print ;

    }
    else
    {
        print= 2 * (height + width);
        document.getElementById("output").innerHTML = "The perimeter of the rectangular is- " + print ;

    }

}

