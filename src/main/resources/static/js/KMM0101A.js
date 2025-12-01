 function dfhsetcursor(n)
   {for (var i=0;i<document.KM0101A.elements.length;i++)
     {if (document.KM0101A.elements[i].name == n)
         {document.KM0101A.elements[i].focus();
          document.KM0101A.DFH_CURSOR.value=n;
          break}}}
 function dfhinqcursor(n)
   {document.KM0101A.DFH_CURSOR.value=n}