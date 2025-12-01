 function dfhsetcursor(n)
   {for (var i=0;i<document.KM0110A.elements.length;i++)
     {if (document.KM0110A.elements[i].name == n)
         {document.KM0110A.elements[i].focus();
          document.KM0110A.DFH_CURSOR.value=n;
          break}}}
 function dfhinqcursor(n)
   {document.KM0110A.DFH_CURSOR.value=n}
 