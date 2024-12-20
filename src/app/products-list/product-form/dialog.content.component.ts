import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog.content-example-dialog.html',
    styleUrl: './dialog.content.css',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
 ) { }
 ngOnInit() {
  // will log the entire data object
  console.log(this.data)
}
calculateDiscount(price: number, discount: number): number {
  return (price * discount) / 100;
}
printInvoice() {
  const printContent = document.getElementById('invoice')?.innerHTML;
  const printWindow = window.open('', '_blank');
  if (printWindow && printContent) {
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 18px;
              margin: 0;
              padding: 0;
            }
            .invoice {
              width: 3in;
              margin: auto;
              text-align: left;
            }
            h1{
              text-align: center;
              margin: 0;
            }
           table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
  }
  
  th, td {
    border: 2px solid #ddd;
    text-align: left;
    padding: 5px;
    font-size: 18px;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
 

  .heena{
    text-align: center;
    font-weight: 800;
    font-size: xxx-large;
    font-style: oblique;
    font-family: system-ui;
    margin-top: 15px;
  }
  .collection{
    font-weight: 600;
    font-size: xx-large;
    text-align: center;
    font-style: italic;
    font-family: system-ui;
    margin: -20px 0px 20px 70px;
  }

  .punch{
    font-weight: 400;
    font-size: larger;
    font-style: italic;
    text-align: center;
    font-family: cursive;
  }
  .address{
    text-align: center;
    font-size: large;
  }

  .mo{
    font-weight: 500;
    text-align: center;
    font-size: xx-large;
    font-family: math;
  }

  .info{
    font-weight: 500;
    text-align: left;
    font-size: x-large;
  }

  .termsHead{
text-align: left;
font-weight: 300;
  }
  .terms{
    text-align: left;

  }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
}
