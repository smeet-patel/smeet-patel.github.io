package com.example.smeet.oneweb;


import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuInflater;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.SearchView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static android.widget.Toast.*;
import static com.example.smeet.oneweb.R.*;

public class MainActivity extends AppCompatActivity implements SearchView.OnQueryTextListener {

    private WebView webView;
    private String urlto;// url which makes the pages
    private String defaulturl ="https://www.google.com"; //default
    private SearchView searchView;
    private EditText urlsetde;
    private String extlink;
    //arraylist to see
    private List<History> urlchange = new ArrayList<History>();
    private List<History> favs = new ArrayList<History>();
    private List<History> acttabs = new ArrayList<History>();

    private String WebTitle;//the title of the tab
    private String curURL; //the url of the current website
    private boolean curfav=false; //setting the tab url not faviorite
    private String currentLayout; //the button actions allcating layout or list to button click action.
    private String urlnow; // url now
    // diffenrent button and actions
    private static final int HISOPEN = 0;
    private static final int HISCLOSE = 1;
    private static final int RETURNHIS = 2;
    private static final int BOOKOP = 3;
    private static final int BOOKDEL = 4;
    private static final int TABOP = 5;
    private static final int TABDEL = 6;
    private static final int SETDE = 7;
    private static final int CLEARHIS = 8;
    //the list adapter which allows to visally to display.
    private ListViewCustomAdapter listAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        main();// setting layout, normal button handler link id , menu inflator, snack bar
        webnew();//webweb start but not load
        //if external contact
        Intent intent = getIntent();
        String action = intent.getAction();
        String extlink = intent.getDataString();
        if(extlink != null) {
            //extlink =data.substring(data.lastIndexOf("/") +1);
            makeText(MainActivity.this, "Opening " + extlink, LENGTH_SHORT).show();
            webView.loadUrl(extlink);
        }
        if (savedInstanceState == null)
        {
            loadDefault();
        }
        changestateurl();

    }

    private void main() {
        setContentView(layout.activity_main);
        Toolbar toolbar;
        toolbar = findViewById(id.toolbar);
        setSupportActionBar(toolbar);// expand toolbar

//        FloatingActionButton fab = (FloatingActionButton) findViewById(id.fab);
//        fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG).setAction("Action", null).show();
//            }
//        });//snack bar if used for extra funtions
    }

    private void webnew() {
        webView = (WebView) findViewById(id.webview);
        webView.setWebViewClient (new WebViewClient());// getting the webview ready for change state.
    }

    private void loadDefault() {
        webView.loadUrl(defaulturl);
    }

    private void changestateurl() {//on change of the url
        webView.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                curfav=false;
                SimpleDateFormat dateFormat;
                dateFormat = new SimpleDateFormat("HH:mm:ss a");
                String valnow = dateFormat.format(new Date());// the timestamp
                urlchange.add(new History(valnow,url)); // adding to history
                curURL =url; // what the current url is.
                WebTitle = view.getTitle(); //storing the title
//              Bitmap bitmapOne =view.getFavicon(); ImageButton imageView = (ImageButton)findViewById(id.fav_m); imageView.setImageIcon(Icon.createWithBitmap(bitmapOne));// trying to get the icon
                setTitle(WebTitle); makeText(MainActivity.this, WebTitle, LENGTH_SHORT).show();
            }
        });
    }

    private void loadurlnow() {
        webView.loadUrl(urlnow);// loads the entered url or website
    }

    private class ButtonHandler implements View.OnClickListener {
        @Override
        public void onClick(View view) {
            urlsetde = (EditText) findViewById(id.setdeTXT);
            switch (view.getId()) {
                //number is guessed
                case id.SetDe:
                    String geturl = urlsetde.getText().toString().trim();
                    defaulturl=geturl;
                    makeText(MainActivity.this, geturl, LENGTH_SHORT).show();
            }
            switch (view.getId()) {
                //number is guessed
                case id.clearhis:
                    acttabs.clear();
                    favs.clear();
                    urlchange.clear();
                    makeText(MainActivity.this, "Clear history and favorite", LENGTH_SHORT).show();
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        MenuInflater menuInflator = getMenuInflater();
        //set up the menu button
        searchView = (SearchView) MenuItemCompat.getActionView(menu.findItem(R.id.app_bar_search));
        searchView.clearFocus();// enter button twice query read. so google says
        searchView.setOnQueryTextListener(this);
        return super.onCreateOptionsMenu(menu);
    }

    public boolean onQueryTextSubmit(String query) {//when enter or submit is pressed
        urlto= query;
        if(urlto.startsWith("http://")||urlto.startsWith("https://")){
            webView.loadUrl(urlto);}
            else if (urlto.contains("www")){
            webView.loadUrl("https://"+urlto);}
            else {webView.loadUrl("https://www.google.co.nz/search?q="+urlto);}
        makeText(getApplicationContext(), "Requesting "+query, LENGTH_LONG).show();
        searchView.clearFocus();
        return true;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        //Do not use! otherwise updates every changed char
        return false;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();//getting the id num
        //noinspection SimplifiableIfStatement
        if (id == R.id.hist_list) {//history list open
            setContentView(layout.historypage);
            setupScreen(HISOPEN);
            return true;
        }
        if (id == R.id.tab_bnt) { //tab list opened
            acttabs.add(new History(WebTitle,curURL));
            setContentView(layout.tagpage);
            setupScreen(TABOP);
            return true;
        }
        if (id == R.id.fav_list){ //fav list opened
            setContentView(layout.favspage);
            setupScreen(BOOKOP);
        }
        if (id == R.id.Back_m) { //back web page
            webView.goBack();
            return true;
        }
        if (id == R.id.forward_m) { //forward webpage
            webView.goForward();
            return true;
        }
        if (id == R.id.action_settings) { //go to setting
            setContentView(layout.setting);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);//have and want to use the menu bar for settings
            setSupportActionBar(toolbar);

            ButtonHandler bh = new ButtonHandler();
            findViewById(R.id.SetDe).setOnClickListener(bh);
            findViewById(R.id.clearhis).setOnClickListener(bh);
            return true;
        }
        if (id == R.id.tab_m) {//tab icon pressed
            curfav=false;
            acttabs.add(new History(WebTitle,curURL));
            makeText(MainActivity.this, "New tab "+WebTitle, LENGTH_SHORT).show();
            webView.setWebViewClient (new WebViewClient());
            main();
            webnew();
            webView.loadUrl(defaulturl);// load default
            changestateurl();// record changes in url
            return true;
        }
        if (id ==  R.id.share){
            Intent sharingIntent = new Intent(android.content.Intent.ACTION_SEND);
            sharingIntent.setType("text/plain");
            String SendURL = "Sharing link of website from Everest " +curURL;
            sharingIntent.putExtra(android.content.Intent.EXTRA_SUBJECT,"Sharing link of website from Everest");
            sharingIntent.putExtra(android.content.Intent.EXTRA_TEXT, SendURL);
            startActivity(Intent.createChooser(sharingIntent, "Share link on"));
        return true;}
        if (id == R.id.fav_m) {// fav icon pressed
            if(!curfav){//as not fav so add
                favs.add(new History(WebTitle,curURL));
                makeText(MainActivity.this, favs.toString(), LENGTH_SHORT).show();
            curfav=true;}//already fav so remove.
            else{favs.remove(favs.size() - 1);
                makeText(MainActivity.this, favs.toString(), LENGTH_SHORT).show();
                curfav=false;}
        return true;
        }
        return super.onOptionsItemSelected(item);
    }

    //implymenting the back menu button next to home button
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
            return;
        }// Otherwise defer to system default behavior.
        super.onBackPressed();
    }

    private void setupScreen(int state) {
        ListView list = (ListView)findViewById(id.listView);

        switch (state) {
            case HISOPEN://opening the history list
                setTitle("History list");
                currentLayout = "openlinkhistory";
                listAdapter = new ListViewCustomAdapter(this, urlchange);
                break;
            case HISCLOSE://remove his 1
                setTitle("Remove History item");
                currentLayout = "removelinkhistory";
                listAdapter = new ListViewCustomAdapter(this, urlchange);
                break;
            case RETURNHIS://back button
                main();
                loadprev();//load the last website
                changestateurl();
                break;
            case BOOKOP://open Favourite
                setTitle("Favourite list");
                currentLayout = "openlinkbook";
                listAdapter = new ListViewCustomAdapter(this, favs);
                break;
            case BOOKDEL:// remove  item from Favourite
                setTitle("Remove item from Favourite");
                currentLayout = "openlinkbookdel";
                listAdapter = new ListViewCustomAdapter(this, favs);
                break;
            case TABOP: //open the tab list
                setTitle("Active tabs");
                currentLayout = "openlinktab";
                listAdapter = new ListViewCustomAdapter(this, acttabs);
                break;
            case TABDEL: //remove from the tab list
                currentLayout = "openlinktabdel";
                listAdapter = new ListViewCustomAdapter(this, acttabs);
                break;
            case SETDE:
                currentLayout = "set-web";// changing default from setting
                break;
            case CLEARHIS:
                currentLayout = "clear-all"; //clear the list and history
                break;
        }

        list.setAdapter(listAdapter);

        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                if(currentLayout=="openlinkhistory"){
                    setContentView(layout.historypage);
                    main();//opening clicked tab
                    loadurlnow();
                    makeText(MainActivity.this, "Opening "+urlnow , LENGTH_LONG).show();
                    changestateurl();
                }
                else if (currentLayout=="removelinkhistory"){
                    urlnow = urlchange.get(position).getUrlList();
                    urlchange.remove(position);//removing history url arraylist
                    setupScreen(HISCLOSE);
                    makeText(MainActivity.this, "Deleting "+urlnow , LENGTH_LONG).show();
                }
                else if(currentLayout=="openlinkbook"){
                    urlnow = favs.get(position).getUrlList();
                    main();//opening clicked tab
                    loadurlnow();
                    makeText(MainActivity.this, "Opening "+urlnow , LENGTH_LONG).show();
                    changestateurl();
                }
                else if (currentLayout=="openlinkbookdel"){
                    urlnow = favs.get(position).getUrlList();
                    favs.remove(position);//removing favs arraylist
                    setupScreen(BOOKDEL);
                    makeText(MainActivity.this, "Deleting "+urlnow , LENGTH_LONG).show();
                }
                else if(currentLayout=="openlinktab"){
                    urlnow = acttabs.get(position).getUrlList();
                    main();//opening clicked tab
                    loadurlnow();
                    makeText(MainActivity.this, "Opening "+urlnow , LENGTH_LONG).show();
                    changestateurl();
                }
                else if (currentLayout=="openlinktabdel"){
                    urlnow = acttabs.get(position).getUrlList();
                    acttabs.remove(position);//removing activtive tabs arraylist
                    setupScreen(TABDEL);
                    makeText(MainActivity.this, "Deleting "+urlnow , LENGTH_LONG).show();
                }
                }
            })
        ;
    }

    private void loadprev() {
        webView.loadUrl(curURL);
    }

    public void hisopen(View v) {
        setupScreen(HISOPEN);
    }

    public void hisclose(View v) {
        setupScreen(HISCLOSE);
    }

    public void returnfromhis(View v) {
        setupScreen(RETURNHIS);
    }

    public void bookopen(View v) {
        setupScreen(BOOKOP);
    }

    public void bookdel(View v) {
        setupScreen(BOOKDEL);
    }

    public void tabopen(View v) {
        setupScreen(TABOP);
    }

    public void tabdel(View v) {
        setupScreen(TABDEL);
    }



    //saving the state of the game
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        outState.putString("urlto", urlto);
        outState.putString("defaulturl", defaulturl);
        outState.putString("curURL", curURL);
        outState.putString("WebTitle", WebTitle);
        outState.putBoolean("curfav", curfav);
        webView.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);

        urlto = savedInstanceState.getString("urlto");
        defaulturl = savedInstanceState.getString("defaulturl");
        curURL = savedInstanceState.getString("curURL");
        WebTitle = savedInstanceState.getString("WebTitle");
        curfav = savedInstanceState.getBoolean("curfav");
        webView.restoreState(savedInstanceState);
    }
}