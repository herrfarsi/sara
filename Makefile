setup:
	npm install

run:
	gulp

deploy:
	git subtree push --prefix dist origin gh-pages