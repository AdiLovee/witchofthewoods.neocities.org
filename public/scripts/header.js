const HEAD = document.getElementById("header");
HEAD.innerHTML = `
    <header>
    <div class="content-box">
      <div class="header-center"><a href="/construction.html"><img class="badge" src="/assets/construction2.png" width="465" height="28" alt="Under Construction"></a></div>
      <div class="home-boxes">
        <section class="home-box">
          <h2>The Witch of the Woods</h2>
          <h4>Welcome to my cottage, come sit by the hearth</h4>
          A website by Adinah Rose
          <br>
          <div class="header-badges">
            <img class="badge" src="/assets/buttons/warning.png">
          </div><br>
          <div class="header-badges">
            <img class="badge" src="/assets/buttons/mobileunfriendly.png">
            <img class="badge" src="/assets/buttons/bestvwmonitor.gif">
            <img class="badge" src="/assets/buttons/1080.png">
          </div>
          <br>
        </section>
        <section class="home-box">
          <div>
          <iframe sandbox="allow-scripts" referrerpolicy="no-referrer" title="Moon phase" src="https://moonphasesoftware.com/embed/moon-phase?tz=America%2FToronto&theme=dark&hemisphere=north" width="280" height="240" style="border:0"></iframe>
          <br><a href="https://moonphasesoftware.com/moon-phase-widget">Check your local moon phase!</a>
          </div>
        </section>
      </div>
      <div class="header-center">      
        <nav class="site-nav"><b>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/grimoire.html">Grimoire</a></li>
            <li><a href="/about.html">About Me</a></li>
            <li><a href="/sites.html">Other Sites</a></li>
            <li><a href="/funstuff.html">Fun Stuff</a></li>
            <li><a href="/guestbook.html">Guestbook</a></li>
          </ul></b>
        </nav>
      </div>
      </div>
    </header>
`;