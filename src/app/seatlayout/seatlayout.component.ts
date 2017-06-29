import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  setNewClass: any;
  private settings: any;
  private rowLength: number;
  private reservedSeat: any[] = [];
  private selectingSeat: any[] = [];
  constructor(private route: Router) {
    this.settings = {
      rows: [1, 1, 1, 1, 1],
      cols: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      rowCssPrefix: 'row-',
      colCssPrefix: 'col-',
      seatWidth: 35,
      seatHeight: 35,
      seatCss: 'seat',
      selectedSeatCss: 'selectedSeat',
      selectingSeatCss: 'selectingSeat'
    };
    console.log("Getting settings", localStorage.getItem("settings"));
    let ls_settings = localStorage.getItem("settings");
    console.log(ls_settings);

    if (ls_settings == null || ls_settings == "undefined") {
      console.log("COMing INSIDE");
      localStorage.setItem("settings", JSON.stringify(this.settings));
    } else {
      if (typeof ls_settings === 'string') {
        this.settings = JSON.parse(localStorage.getItem("settings"));
      }
    }

    if (!localStorage.getItem("reservedSeat")) {
      localStorage.setItem("reservedSeat", JSON.stringify(this.reservedSeat));
    } else {
      this.reservedSeat = JSON.parse(localStorage.getItem("reservedSeat"));
    }

    // if (!localStorage.getItem("reservedSeat")) {
    //   localStorage.setItem("reservedSeat", JSON.stringify(this.reservedSeat));
    // } else {
    //   this.reservedSeat = JSON.parse(localStorage.getItem("reservedSeat"));
    // }

    this.rowLength = this.settings.rows.length;
  }

  getSeatNo(i, j) {
    return (i + j * this.rowLength + 1);
  }

  getClassName(i, j) {
    let id = this.settings.rowCssPrefix + i.toString() + ' ' + this.settings.colCssPrefix + j.toString();
    let className = this.settings.seatCss + ' ' + id;
    if (this.reservedSeat.length > 0 && this.reservedSeat.indexOf(this.getSeatNo(i, j)) != -1) {
      className += (' ' + this.settings.selectedSeatCss);
    }

    return className;
  }

  seatClick(seatno, event: any) {
    if (event.target.className.indexOf('selectedSeat') !== -1) {
      return alert('Already booked! :(');
    }

    if (event.target.className.indexOf('selectingSeat') == -1) {
      event.target.className += ' selectingSeat';
      this.selectingSeat.push(seatno);
    } else {
      event.target.className.replace('selectingSeat', '');
      let index = this.selectingSeat.indexOf(seatno);
      if (index > -1) {
        this.selectingSeat.splice(index, 1);
      }
    }
    console.log(event.target.className, seatno);
  }

  getTop(i) {
    return i * this.settings.seatHeight;
  }

  getLeft(j) {
    return j * this.settings.seatWidth;
  }

  bookTicket() {
    if (this.selectingSeat.length == 0) {
      alert('Please select seat..!');
      return;
    }
    this.reservedSeat = this.reservedSeat.concat(this.selectingSeat);
    localStorage.setItem("reservedSeat", JSON.stringify(this.reservedSeat));
    alert('You have booked your ticket successfully');

    this.route.navigate(['/']);
  }

  ngOnInit() {
  }

}
