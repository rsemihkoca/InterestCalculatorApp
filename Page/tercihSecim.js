function tercihsecim() {
  var sbasit = document.getElementById('yon').checked;
  var sbilesik = document.getElementById('yonB').checked;
  var svfaizlendirme = document.getElementById("faizlendirme").value;
  var svfaizvade = document.getElementById("faizvade").value;
  var svvadebirim = document.getElementById("vadebirim").value;
  
  if (sbasit) {
    document.getElementById('li_faizlendirme').style.display = 'none';
    if ((svfaizvade == 0 && svvadebirim == 12) || (svfaizvade == 12 && svvadebirim == 0))
      document.getElementById('li_gunsayisi').style.cssText = 'display:list-item;display:flex;';
    else
      document.getElementById('li_gunsayisi').style.display = 'none';
  }
  
  if (sbilesik) {
    document.getElementById('li_faizlendirme').style.cssText = 'display:list-item;display:flex;';
    if ((svfaizvade == 0 && svfaizlendirme == 12) || (svfaizvade == 12 && svfaizlendirme == 0) || (svvadebirim == 12 && svfaizlendirme == 0))
      document.getElementById('li_gunsayisi').style.cssText = 'display:list-item;display:flex;';
    else
      document.getElementById('li_gunsayisi').style.display = 'none';
  }
}