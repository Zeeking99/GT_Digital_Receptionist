import React from "react"
import SplitPane from "react-split-pane"
<SplitPane
  split="vertical"
  minSize={50}
  defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
  onChange={(size) => localStorage.setItem('splitPos', size)}
>
</SplitPane>