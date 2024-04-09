<script>
	import '../app.scss'
	import 'bootstrap-icons/font/bootstrap-icons.css'
	import Header from './header.svelte'
	import Footer from './footer.svelte'
</script>

<Header></Header>
<slot />
<Footer></Footer>
