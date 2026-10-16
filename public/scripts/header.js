const HEAD = document.getElementById("header");
HEAD.innerHTML = `
    <header>
      <div class="header-center"><img src="/assets/construction2.png" width="465" height="28" alt="Under Construction"></div>
      <div class="home-boxes">
        <section class="home-box">
          <h2>The Witch of the Woods</h2>
          <h4>Welcome to my cottage, come sit by the hearth</h4>
          A website by Adinah Rose
        </section>
        <section class="home-box">
          <ws-widget type="moon" iid="21075" embed="iframe"></ws-widget>
        </section>
      </div>
      <div class="header-center">      
        <nav class="site-nav">
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/grimoire.html">Grimoire</a></li>
            <li><a href="/about.html">About Me</a></li>
            <li><a href="/sites.html">Other Sites</a></li>
          </ul>
        </nav>
      </div>
    </header>
`;