function tercihsecim() {
  var sbasit = document.getElementById('yon').checked;
  var sbilesik = document.getElementById('yonB').checked;
  var svfaizlendirme = document.getElementById("faizlendirme").value;
  var svfaizbirim = document.getElementById("faizbirim").value;
  var svvadebirim = document.getElementById("vadebirim").value;
  
  if (sbasit) {
    document.getElementById('li_faizlendirme').style.display = 'none';
    // if ((svfaizbirim == 0 && svvadebirim == 12) || (svfaizbirim == 12 && svvadebirim == 0))
    //   document.getElementById('li_gunsayisi').style.cssText = 'display:list-item;display:flex;';
    // else
    //   document.getElementById('li_gunsayisi').style.display = 'none';
  }
  
  if (sbilesik) {
    document.getElementById('li_faizlendirme').style.cssText = 'display:list-item;display:flex;';
    // if ((svfaizbirim == 0 && svfaizlendirme == 12) || (svfaizbirim == 12 && svfaizlendirme == 0) || (svvadebirim == 12 && svfaizlendirme == 0))
    //   document.getElementById('li_gunsayisi').style.cssText = 'display:list-item;display:flex;';
    // else
    //   document.getElementById('li_gunsayisi').style.display = 'none';
  }
}