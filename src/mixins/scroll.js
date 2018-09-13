const scroll = {
  props: {
    maxHeight: {
      type: String
    }
  },

  data () {
    return {
      hasBottomShadow: true,
      hasTopShadow: true
    }
  },

  mounted () {
    const tbody = this.$el.querySelector('.tbody')

    if (this.maxHeight) {
      tbody.addEventListener('scroll', this.getBottomPosition)
      tbody.addEventListener('scroll', this.getTopPosition)
    }
  },

  watch: {
    '$refs.tbody': {
      handler: 'getBottomPosition',
      immediate: true
    }
  },

  methods: {
    getTopPosition () {
      const tbodyTop = this.$refs.tbody.scrollTop

      const initial = tbodyTop === 0

      this.hasTopShadow = initial
    },

    getBottomPosition () {
      this.$nextTick(() => {
        const tbodyHeight = this.$refs.tbody.scrollHeight
        const tbodyTop = this.$refs.tbody.scrollTop

        const final = tbodyHeight === +this.maxHeight + tbodyTop

        this.hasBottomShadow = final
      })
    }
  },

  beforeDestroy () {
    const tbody = this.$el.querySelector('.tbody')

    if (this.maxHeight) {
      tbody.removeEventListener('scroll', this.getBottomPosition)
      tbody.removeEventListener('scroll', this.getTopPosition)
    }
  }
}

export default scroll
