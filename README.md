# EasyMapStyler

* 專案核心目標： 讓一般人可以在無安裝軟體的環境編輯地圖，然而又可以把編輯結果交給GIS的專業人士進行後續分析與樣式調整的作業。

### 功能規劃
1. 純前端
2. Drag local file to web / Assess to Google Drive
    * 使用者貼上一google drive共享連結，允許平台存取該目錄的資源。
    * 拖曳本地端資源到地圖上展示

Example:
![](https://i.imgur.com/m1JQd5s.png)

3. 資料本身唯讀，樣式本身可以rw。網頁本身get data and symbol。前端本身有一個功能可以把 json 形式的 symbol 轉換成 qml 等開放格式
4. 有隨時自動存檔的功能與存檔按鈕。
5. [未來ㄉ坑]使用者自行繪製圖徵，且可輸出為geojson並搭配平台的樣式表

### 開發資源 / Skills
<div style='color:red;'>

* Github開源專案 (純前端，GitHub Page)
* Openlayers 6.x
* React/Redux
* Bootstrap
* Google Drive API (Get, Post)
* json to qml (https://github.com/Orange-OpenSource/qmljsreformatter)
* docker

</div>

### 樣式表格式
#### SLD (Style Layer Descriptor) (OGC開源格式)
* Ref: [OGC(2020), Styled Layer Descriptor](https://www.ogc.org/standards/sld?)
* Ref: [GeoServer(2020), SLD Styling.](https://docs.geoserver.org/stable/en/user/styling/sld/index.html)
* Ref: [ArcMap2SLDConverter_Eng](https://arcmap2sld.i3mainz.hs-mainz.de/ArcMap2SLDConverter_Eng.htm?)

### GitHub Repo Resources

* [geobuf](https://github.com/mapbox/geobuf)
    * gis資料壓縮
* [geojson-vt](https://github.com/mapbox/geojson-vt)
    * geojson 即時轉換成圖磚
* [SLDexit](https://github.com/Norkart/SLDexit?)
    * 將sld轉為mapbox上面樣式表能夠接受的格式 (sld to jsons)
* [SLDReader](https://github.com/nieuwlandgeo/sldreader)
    * sld to js object.(openlayer)

### Discussions (坑或是待思考的)
* 格式轉換這件事情，可以獨立專案進行開發js或python版本。.sld 才是ogc的開源格式。可以是一個一個nodejs module流程中等同一個方法也可綁定到網頁按鈕上。
* [Model Builder](https://github.com/YuChunTsao/WebGISModeler?)平台可以整合資料庫，作為資料來源或是儲存的空間。可以匯出模型定義檔案(json, xml, yaml...)→匯出樣式（.sld）
* **定義前段地圖框架的style與sld的對應**
* SLD的應用場景，以及各個地圖框架是否存在通用的樣式描述？