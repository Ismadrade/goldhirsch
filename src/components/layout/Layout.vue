<template>
  <div class="sb-nav-fixed">
    <Nav></Nav>
    <div id="layoutSidenav">
      <Sidenav></Sidenav>
      <div id="layoutSidenav_content">
        <main>
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>       
  </div>
</template>

<script>
import jQuery from 'jquery';
import Nav from '../template/Nav.vue';
import Sidenav from '../template/Sidenav.vue';

export default {
  components:{
    Nav,
    Sidenav
  },

  mounted: function () {
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

  },
    
};
</script>

<style>
@import '../../main.css';
</style>