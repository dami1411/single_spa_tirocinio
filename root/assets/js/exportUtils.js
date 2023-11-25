const exportUtils = {
    download(filename, href) {
      var element = document.createElement('a');
      element.setAttribute('href', href);
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    
    csv: (data) => {
      if (!!data && data.length > 0) {
        var json = data;
        var fields = Object.keys(json[0]);
        var csv = json.map(r => {
          return fields.map(f => {
            return JSON.stringify(r[f], (k, v) => v === null ? '' : v)
          }).join(',');
        });
        csv.unshift(fields.join(',')); // add header column
        return csv.join('\r\n');
      }
      return '';
    },

    print(blob) {
      var blobURL = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe'); //load content in an iframe to print later
      document.body.appendChild(iframe);

      iframe.style.display = 'none';
      iframe.src = blobURL;
      iframe.onbeforeunload = (e) => document.body.removeChild(iframe);
      iframe.onafterprint = (e) => document.body.removeChild(iframe);
      iframe.onload = function () {
        setTimeout(function () {
          iframe.focus();
          iframe.contentWindow.print();
        }, 1);
      };
  }
  };