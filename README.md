For local development you may adapt `_dev_config.yml` to your needs and then run:

```
sudo bundle exec jekyll serve --host 0.0.0.0 --port 80 --config _config.yml,_dev_config.yml
```

The site.env variable is set to `prod` on github-pages and will be `dev` when using `_dev_config.yml` locally. Lambdas in dev stage will be triggered when local dev mode is run.
