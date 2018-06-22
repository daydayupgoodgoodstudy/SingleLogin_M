import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AntdIcon from 'antd/lib/icon';

/**
 * 字体图标，兼容antd的图标
 */
class Icon extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    antd: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'iconfont anticon ac',
  };

  render() {
    const {
      prefixCls,
      type,
      children,
      className,
      antd,
      spin,
      ...props
    } = this.props;
    const cn = classnames(
      prefixCls,
      type,
      className,
    );
    console.log(cn)
    return antd ? (
      <AntdIcon type={type} className={className} spin={spin} {...props}>
        {children}
      </AntdIcon>
    ) : (
      <i className={cn} {...props}>
        {children}
      </i>
    );
  }
}

export default Icon;
